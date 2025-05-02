
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function getUsernameFromSystem(): string {
  // In a real application, this could be fetched from user login
  // For now, we'll return a default value
  return "vishnu";
}
