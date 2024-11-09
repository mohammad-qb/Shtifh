import { $Enums } from '@prisma/client';

export const generateImageUrl = (gender: $Enums.Gender, username: string) => {
  return `https://avatar.iran.liara.run/public/${
    gender === 'FEMALE' ? 'girl' : 'boy'
  }?username=${username}`;
};