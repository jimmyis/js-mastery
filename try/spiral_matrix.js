fir add .let matrixGen = (mtxSize) => {
  if (mtxSize && typeof mtxSize === 'number' && mtxSize > 0) {
    const maxX = mtxSize.x ? mtxSize.x : mtxSize
    const maxY = mtxSize.y ? mtxSize.y : mtxSize
    let matrix = new Array
    l set matrixString = ''
    let serializer = 1
    let boundary = new Array
    let posX = 0
    let posY = 0
    // check position and boundary, if true, change direction,
    let positioner = () => {
      // direction will change by increasing position by one axis and lock the other
      // write from minX to maxX with boundary limitation
      // after each written and passed position... add more into boundary matrix
      
      // direction will move by checking current position compare to max position by axis
      // Move left to right
      // if(posX === maxX) {

      // }
      let walker = {
        step: 0,
        initStep: 1,
        posX: 0,
        posY: 0,
        posXprev: -1,
        posYprev: -1
      };
      let totalMatrix = (mtxSize.x && mtxSize.y) ? (mtxSize.x * mtxSize.y) : (mtxSize * mtxSize)
      for (walker.step = 1; walker.step <= totalMatrix; walker.step++){
        // initializer
        console.log('// WalkerStep: ' + walker.step)
        if(walker.posX < walker.initStep && walker.posY < walker.initStep) {
          console.log('Init')
          // Should print only 1 time

          walker.posXprev = walker.posX
          walker.posYprev = walker.posY
          walker.posX++
          walker.posY++
          boundary[walker.step - 1] = { x: walker.posX, y: walker.posY }
          // boundary[(walker.step + 1)] = { x: (walker.posX + 1), y: (walker.posY + 1) }
          let currentBoundary = JSON.stringify((boundary[walker.step - 1]))
          console.log('Position:' + walker.posX + '/' + walker.posY + ' ; Boundary:' + currentBoundary + ' ; Serializer: ' + serializer )
          console.log('Previous Position : X: ' + walker.posXprev + ' Y: ' + walker.posYprev)
          console.log('Current Position : X: ' + walker.posX + ' Y: ' + walker.posY)

          matrixString = matrixString.concat(serializer + ', ')
          serializer++
        }
        // directioner
        if((walker.step > walker.initStep) && (boundary.length - 1) < walker.step) {
          console.log('Directioner')
          // from left to right
          // console.log(boundary[(walker.step - 1)]['x'])
          if ((walker.posX + 1) > walker.posXprev && walker.posX < maxX &&  walker.posY == boundary[(walker.step - 2)]['y']) {
              console.log('Walk left to right')
              walker.posXprev = walker.posX
              walker.posYprev = walker.posY

              walker.posX++
              boundary[(walker.step - 1)] = { x: walker.posX, y: walker.posY }
              let currentBoundary = JSON.stringify((boundary[walker.step - 1]))
              console.log('Position:' + walker.posX + '/' + walker.posY + ' ; Boundary:' + currentBoundary + ' ; Serializer: ' + serializer )
              console.log('Previous Position : X: ' + walker.posXprev + ' Y: ' + walker.posYprev)
              console.log('Current Position : X: ' + walker.posX + ' Y: ' + walker.posY)
              matrixString = matrixString.concat(serializer + ', ')
          }

          // from top to down
          if ((walker.posY + 1) > walker.posYprev && walker.posY < maxY && walker.posX == boundary[(walker.step - 2)]['x']) {
            console.log('Walk top to down')
            walker.posXprev = walker.posX
            walker.posYprev = walker.posY

            walker.posY++
            boundary[(walker.step - 1)] = { x: walker.posX, y: walker.posY }
            let currentBoundary = JSON.stringify((boundary[walker.step - 1]))
            console.log('Position:' + walker.posX + '/' + walker.posY + ' ; Boundary:' + currentBoundary + ' ; Serializer: ' + serializer )
            console.log('Previous Position : X: ' + walker.posXprev + ' Y: ' + walker.posYprev)
            console.log('Current Position : X: ' + walker.posX + ' Y: ' + walker.posY)
            matrixString = matrixString.concat(serializer + ', ')

          }

          // from right to left
          if ((walker.posX - 1) < walker.posXprev && walker.posX > 1 && walker.posY == boundary[(walker.step - 2)]['y']) {
            console.log('Walk right to left')
            walker.posXprev = walker.posX
            walker.posYprev = walker.posY

            walker.posX--
            boundary[(walker.step - 1)] = { x: walker.posX, y: walker.posY }
            let currentBoundary = JSON.stringify((boundary[walker.step - 1]))
            console.log('Position:' + walker.posX + '/' + walker.posY + ' ; Boundary:' + currentBoundary + ' ; Serializer: ' + serializer )
            console.log('Previous Position : X: ' + walker.posXprev + ' Y: ' + walker.posYprev)
            console.log('Current Position : X: ' + walker.posX + ' Y: ' + walker.posY)
            matrixString = matrixString.concat(serializer + ', ')

          }

          // from down to top
          if ((walker.posY - 1) < walker.posYprev && walker.posY > 1 && walker.posX == boundary[(walker.step - 2)]['x']) {
            console.log('Walk down to up')
            walker.posXprev = walker.posX
            walker.posYprev = walker.posY

            walker.posY--
            boundary[(walker.step - 1)] = { x: walker.posX, y: walker.posY }
            let currentBoundary = JSON.stringify((boundary[walker.step - 1]))
            console.log('Position:' + walker.posX + '/' + walker.posY + ' ; Boundary:' + currentBoundary + ' ; Serializer: ' + serializer )
            console.log('Previous Position : X: ' + walker.posXprev + ' Y: ' + walker.posYprev)
            console.log('Current Position : X: ' + walker.posX + ' Y: ' + walker.posY)
            matrixString = matrixString.concat(serializer + ', ')

          }
          serializer++
        }
        // matrixString = matrixString.concat('x' + (walker.posX) + ':', 'y' + (posY) + ', ')
        // matrixString = matrixString.concat((walker.step + 1) + ', ')

        console.log('// Boundary Length: ' + boundary.length)
        console.log('////////////////////')
      }
      matrixString = matrixString.slice(0,-2)
      console.log('// Result //')
      console.log(boundary)
      return matrix
      // matrix = matrixString.split('', mtxSize)
      // return matrix
    }

    // Renderer by Loop from min X to max X (column) and in each Y position (row)
    let renderer = () => {
      for (posY = 0; (posY < maxY) ; posY++) {
        for (posX = 0; posX < maxX ; posX++){
          if (true) {

          }
          // matrixString = matrixString.concat(serializer + ',')
          // serializer++
          matrixString = matrixString.concat('x' + (posX + 1) + ':', 'y' + (posY + 1) + ', ')
        }
      }
      matrixString = matrixString.slice(0,-2)
      return matrixString
    }
    return positioner()
  } else {
    return 'No matrix at all'
  }
}

console.log(matrixGen(3))