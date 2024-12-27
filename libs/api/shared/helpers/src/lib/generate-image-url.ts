import { Gender } from '@shtifh/helpers';

export const generateImageUrl = (gender: Gender, username: string) => {
  return `https://avatar.iran.liara.run/public/${
    gender === Gender.FEMALE ? 'girl' : 'boy'
  }?username=${username}`;
};
