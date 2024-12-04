export function generateLetterAvatar(name: string): string {
  const letter = name.charAt(0).toUpperCase()
  // Using DiceBear's initials avatar service
  return `https://api.dicebear.com/7.x/initials/png?seed=${letter}&backgroundColor=00A6B2&textColor=ffffff`
} 