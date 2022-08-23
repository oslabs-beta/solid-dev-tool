import { Portal } from "solid-js/web";
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  onCleanup,
  onMount,
} from "solid-js";

const DEFAULT_THRESHOLD = 50;

export interface BaseSolidBottomsheetProps {
  children: JSX.Element;
  onClose: () => void;
}

export interface DefaultVariantProps extends BaseSolidBottomsheetProps {
  variant: "default";
}

export interface SnapVariantProps extends BaseSolidBottomsheetProps {
  variant: "snap";
  defaultSnapPoint: ({ maxHeight }: { maxHeight: number }) => number;
  snapPoints: ({ maxHeight }: { maxHeight: number }) => number[];
}

export type SolidBottomsheetProps = DefaultVariantProps | SnapVariantProps;

export const SolidBottomsheet: Component<SolidBottomsheetProps> = (props) => {
  const isSnapVariant = props.variant === "snap";

  const [maxHeight, setMaxHeight] = createSignal(window.visualViewport.height);
  const [isClosing, setIsClosing] = createSignal(false);
  const [isSnapping, setIsSnapping] = createSignal(false);

  const getDefaultTranslateValue = () => {
    if (isSnapVariant) {
      const defaultValue = props.defaultSnapPoint({ maxHeight: maxHeight() });
      if (defaultValue !== maxHeight()) {
        return window.innerHeight - defaultValue;
      }
    }
    return 0;
  };

  const getSnapPoints = (maxHeight: number): number[] => {
    return isSnapVariant
      ? [0, ...props.snapPoints({ maxHeight }).sort((a, b) => b - a)]
      : [];
  };

  const clampInRange = ({
    minimum,
    maximum,
    current,
  }: Record<"minimum" | "maximum" | "current", number>): number =>
    Math.min(Math.max(current, minimum), maximum);

  const [bottomsheetTranslateValue, setBottomsheetTranslateValue] =
    createSignal(getDefaultTranslateValue());

  const onViewportChange = () => {
    setMaxHeight(window.visualViewport.height);
  };

  onMount(() => {
    document.body.classList.add("sb-overflow-hidden");
    window.visualViewport.addEventListener("resize", onViewportChange);
  });

  onCleanup(() => {
    document.body.classList.remove("sb-overflow-hidden");
    //window.visualViewport.removeEventListener("resize", onViewportChange);
  });

  createEffect(() => {
    snapPoints = getSnapPoints(maxHeight());
  });

  let snapPoints: number[] = [];

  let touchStartPosition = 0;
  let lastTouchPosition = 0;

  const onTouchStart: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = (
    event
  ) => {
    isSnapVariant && setIsSnapping(false);

    touchStartPosition = lastTouchPosition = event.touches[0].clientY;
  };

  const onTouchMove: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = (
    event
  ) => {
    let dragDistance = 0;

    switch (props.variant) {
      case "snap":
        dragDistance = event.touches[0].clientY - lastTouchPosition;

        setBottomsheetTranslateValue((previousVal) =>
          clampInRange({
            minimum: 0,
            maximum: maxHeight(),
            current: previousVal + dragDistance,
          })
        );

        lastTouchPosition = event.touches[0].clientY;

        break;
      case "default":
      default:
        lastTouchPosition = event.touches[0].clientY;
        dragDistance = lastTouchPosition - touchStartPosition;

        if (dragDistance > 0) {
          setBottomsheetTranslateValue(dragDistance);
        }

        break;
    }
  };

  const onTouchEnd: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent> = () => {
    let currentPoint = 0;
    let closestPoint = 0;

    switch (props.variant) {
      case "snap":
        currentPoint = maxHeight() - lastTouchPosition;

        closestPoint = snapPoints.reduce((previousVal, currentVal) => {
          return Math.abs(currentVal - currentPoint) <
            Math.abs(previousVal - currentPoint)
            ? currentVal
            : previousVal;
        });

        if (closestPoint === 0) {
          setIsClosing(true);
          break;
        }

        setIsSnapping(true);
        setBottomsheetTranslateValue(maxHeight() - closestPoint);

        break;
      case "default":
      default:
        if (lastTouchPosition - touchStartPosition > DEFAULT_THRESHOLD) {
          setIsClosing(true);
        } else {
          setBottomsheetTranslateValue(0);
        }

        break;
    }
  };

  // removed this onClick so drawer doesnt close when clicking outside of it added to div class = sbOverlay
  const onOverlayClick: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent> = (
    event
  ) => {
    if (event.target.className === "sb-overlay") {
      setIsClosing(true);
    }
  };

  // this probably handles resizing the window
  const handleMouseDown = (e) => {
    const content = document.querySelector(".sb-content");
    console.log(e.target);
    const md = {
      e,
      offsetLeft: e.target.offsetLeft,
      offsetTop: e.target.offsetTop,
      contentHeight: content.offsetHeight,
    };

    const handleMouseMove = (e) => {
      var delta = {
        x: e.clientX - md.e.clientX,
        y: e.clientY - md.e.clientY
      };

      e.target.style.top = md.offsetTop - delta.y + "px";
      content.style.height = (md.contentHeight - delta.y) + "px";
    }

    window.onmousemove = handleMouseMove
    window.onmouseup = () => window.onmousemove = window.onmouseup = null;
  } 

  return (
    <Portal>
      <div class="sb-overlay">
        <div
          id='debugger-display'
          classList={{
            "sb-content": true,
            "sb-is-closing": isClosing(),
            "sb-is-snapping": isSnapping(),
          }}
          style={{
            transform: `translateY(${bottomsheetTranslateValue()}px)`,
            ...(isSnapVariant ? { height: `${maxHeight()}px` } : {}),
          }}
          {...(isClosing() ? { onAnimationEnd: props.onClose } : {})}
        >
          <div
            class="sb-handle-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            //onmousedown={handleMouseDown}
          >
            <div class="sb-handle" />
          </div>
          {props.children}
        </div>
      </div>
    </Portal>
  );
};