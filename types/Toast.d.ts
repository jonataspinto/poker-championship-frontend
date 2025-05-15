type ToastItem = {
  id: number;
  type: "default" | "success" | "danger";
  text: string;
  duration?: number;
};
