export const checkShot = (shot, userId) => {
  if (!shot) {
    return
  }
  shot._doc.liked = shot.likedUser.indexOf(userId) > -1
  return shot
}

export const checkShots = (shots, userId) => shots.map(shot => checkShot(shot, userId))

