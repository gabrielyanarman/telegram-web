export function findParticipantUser(thisUser, chat, users) {
  const userUid = chat.participants.find((uid) => uid != thisUser.uid);
  const user = users.data[userUid];
  return user;
}
