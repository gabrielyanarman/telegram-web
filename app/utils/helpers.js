import { useGetUser } from './hooks';

export async function findParticipantUser(thisUser, chat, users) {
  const userUid = chat.participants.find((uid) => uid != thisUser.uid);
  const user = await useGetUser(userUid);
  return user;
}

export function getTime(dateNow) {
  const now = new Date();
  const date = new Date(dateNow);

  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays >= 1) {
    if (diffInDays < 7) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return daysOfWeek[date.getDay()];
    } else if (diffInDays < 30) {
      return (
        date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
      );
    } else {
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1;
      return day + '.' + month + '.' + date.getFullYear();
    }
  } else {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
  }
}

export function getChatId(url) {
  return url.split('/:').at(-1);
}
