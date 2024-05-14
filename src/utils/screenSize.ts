// Helper function to determine the current breakpoint

type BreakPointType = "2xl" | "xl" | "lg" | "md" | "sm" | "base";

const getBreakpoint = () => {
  const width = window.innerWidth;
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "base";
};

const getCanvasWidth = (breakPoint: BreakPointType) => {
  switch (breakPoint) {
    case "2xl":
      return 800;

    case "xl":
      return 800;

    case "lg":
      return 800;

    case "md":
      return 700;

    case "sm":
      return 300;

    default:
      return 300;
  }
};

export { getBreakpoint, getCanvasWidth };
