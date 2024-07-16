export function truncateTitle(title: string, maxLength:number) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  } else {
    return title;
  }
}

export function truncateDescriptiont(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  } else {
    return description;
  }
}