export const getOrSetGuestId = (): string => {
  // Check if we are in the browser (localStorage isn't on the server)
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("doodle_guest_id");
  if (!id) {
    // Generate a random ID (e.g., guest_abc123)
    id = `guest_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem("doodle_guest_id", id);
  }
  return id;
};1