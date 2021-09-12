export interface INotification {
  type: "success" | "default" | "error" | "warning" | "info"
  content: any
}
