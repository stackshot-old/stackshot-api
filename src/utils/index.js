export const checkShots = (shots, userId) => shots.map(shot => checkShot(shot, userId))

export const checkShot = (shot, userId) => {
  shot._doc.liked = shot.likedUser.indexOf(userId) > -1
  return shot
}
