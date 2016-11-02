export const checkShots = (shots, userId) => shots.map(shot => {
    shot._doc.liked = shot.likedUser.indexOf(userId) > -1
    return shot
  })
