import "./circleTransition.css";

/**
 * Runs `update` inside a view transition: the new state is revealed as a circle growing from the
 * center of `origin`, or with `reverse` the old state disappears as a circle shrinking into it.
 * Without View Transitions support or with reduced motion, `update` just runs.
 */
export function circleTransition(
  origin: Element,
  update: () => void,
  reverse = false,
) {
  if (
    !document.startViewTransition ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }

  const { left, top, width, height } = origin.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  // distance to the farthest corner, so the circle covers the whole screen
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );

  const root = document.documentElement;
  root.classList.add("circle-transition");
  root.classList.toggle("circle-transition-reverse", reverse);

  const transition = document.startViewTransition(update);
  transition.ready.then(() => {
    const circle = [
      `circle(0 at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ];
    const animation = root.animate(
      { clipPath: reverse ? circle.reverse() : circle },
      {
        duration: 400,
        easing: "ease-in-out",
        // keep the end state until the transition is torn down, otherwise reverse flashes the old state
        fill: "forwards",
        pseudoElement: reverse
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      },
    );
    // drop the filled end state, or it would stick to the next transition's snapshots
    transition.finished.then(() => animation.cancel());
  });
  transition.finished.then(() =>
    root.classList.remove("circle-transition", "circle-transition-reverse"),
  );
}
