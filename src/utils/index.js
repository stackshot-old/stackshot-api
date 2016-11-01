export const checkShots = (shots, userId) => shots.map(shot => {
    shot.liked = shot.likedUser.indexOf(userId) > -1
    shot.test = 'hahahah'
    return shot
  })
