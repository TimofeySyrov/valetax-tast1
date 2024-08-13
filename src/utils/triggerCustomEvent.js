const triggerCustomEvent = (eventName, details) => {
  const event = new CustomEvent(eventName, { detail: details });
  document.dispatchEvent(event);
};

export default triggerCustomEvent;
