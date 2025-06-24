export function splitIntoSessions(messages) {
  const sessions = [];
  let currentSession = [];

  for (const msg of messages) {
    if (msg.type === 'notice' && msg.content.includes('종료')) {
      if (currentSession.length > 0) {
        sessions.push(currentSession);
        currentSession = [];
      }
    } else {
      currentSession.push(msg);
    }
  }

  if (currentSession.length > 0) sessions.push(currentSession);

  return sessions;
}
