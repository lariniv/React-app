export function getFieldName(edittedField: string | Date) {
  return String(edittedField) === "dueDate" ? "due date" : String(edittedField);
}

export function getInitialValue(
  edittedField: string | Date,
  initialValue: string | Date
) {
  if (edittedField === "dueDate")
    return new Date(initialValue).toLocaleDateString();
  if (edittedField === "priority")
    return (
      String(initialValue).slice(0, 1).toUpperCase() +
      String(initialValue).slice(1).toLowerCase()
    );
  return String(initialValue);
}

export function getChangedValue(
  edittedField: string | Date,
  changedValue: string | Date
) {
  if (edittedField === "dueDate") {
    return new Date(changedValue).toLocaleDateString();
  }
  if (edittedField === "priority" && typeof changedValue === "string") {
    return (
      changedValue.slice(0, 1).toUpperCase() +
      changedValue.slice(1).toLowerCase()
    );
  }
  return String(changedValue);
}

export function getAssembledTime(date: Date) {
  if (date.getMinutes() > 10) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  return `${date.getHours()}:0${date.getMinutes()}`;
}

export function getLocalTime(date: Date) {
  return new Date(date).toLocaleDateString("en-UA", {
    day: "numeric",
    month: "long",
  });
}
