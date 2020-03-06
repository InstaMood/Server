const vision = require('@google-cloud/vision');
const googleVision = async (link) => {
  try {
    const client = new vision.ImageAnnotatorClient();
  
    const [result] = await client.faceDetection(link);
    const faces = result.faceAnnotations;

    if (faces.length) {
      if (landMarkConfidenceCheck(faces)) {
        const joy = joyCounter(faces);
        const sorrow = sorrowCounter(faces);
        const anger = angerCounter(faces);
        const surprise = surpriseCounter(faces);
        
        let mood = [joy, sorrow, anger, surprise];
        let result = [];

        mood.forEach(el => {
          let sorted = Object.entries(el).sort((a,b) => a[1] - b[1]);
          result.push(sorted[sorted.length - 1][0])
        });

        if (result[0] === 'VERY_LIKELY' || 'LIKELY') return 'joy'
        if (result[1] === 'VERY_LIKELY' || 'LIKELY') return 'sorrow';
        if (result[2] === 'VERY_LIKELY' || 'LIKELY') return 'anger';
        if (result[3] === 'VERY_LIKELY' || 'LIKELY') return 'surprise';
        
      } else {
        return 'Wajah kurang jelas'
      }
    } else {
      return 'No face detected'
    }
  } catch (err) {
    console.log(err);
  }
}

const landMarkConfidenceCheck = (arr) => {
  let total = 0;
  arr.forEach(el => {
    total += el.landmarkingConfidence;
  });

  const average = total / arr.length;
  const result = average > 0.5 ? true : false;

  return result;
}

const joyCounter = (arr) => {
  let counter = {
    VERY_UNLIKELY: 0,
    UNLIKELY: 0,
    POSSIBLE: 0,
    LIKELY: 0,
    VERY_LIKELY: 0,
  }
  arr.forEach(el => {
    // Hitung joyLikelihod
    switch (el.joyLikelihood) {
      case 'VERY_LIKELY':
        counter.VERY_LIKELY++;
        break;
      case 'LIKELY':
        counter.LIKELY++;
        break;
      case 'POSSIBLE':
        counter.POSSIBLE++;
        break;
      case 'UNLIKELY':
        counter.UNLIKELY++;
        break;
      case 'VERY_UNLIKELY':
        counter.VERY_UNLIKELY++;
        break;
      default:
        break;
    }
  })
  return counter
}

const sorrowCounter = (arr) => {
  let counter = {
    VERY_UNLIKELY: 0,
    UNLIKELY: 0,
    POSSIBLE: 0,
    LIKELY: 0,
    VERY_LIKELY: 0,
  }
  arr.forEach(el => {
    // Hitung joyLikelihod
    switch (el.sorrowLikelihood) {
      case 'VERY_LIKELY':
        counter.VERY_LIKELY++;
        break;
      case 'LIKELY':
        counter.LIKELY++;
        break;
      case 'POSSIBLE':
        counter.POSSIBLE++;
        break;
      case 'UNLIKELY':
        counter.UNLIKELY++;
        break;
      case 'VERY_UNLIKELY':
        counter.VERY_UNLIKELY++;
        break;
      default:
        break;
    }
  })
  return counter
}

const angerCounter = (arr) => {
  let counter = {
    VERY_UNLIKELY: 0,
    UNLIKELY: 0,
    POSSIBLE: 0,
    LIKELY: 0,
    VERY_LIKELY: 0,
  }
  arr.forEach(el => {
    // Hitung joyLikelihod
    switch (el.angerLikelihood) {
      case 'VERY_LIKELY':
        counter.VERY_LIKELY++;
        break;
      case 'LIKELY':
        counter.LIKELY++;
        break;
      case 'POSSIBLE':
        counter.POSSIBLE++;
        break;
      case 'UNLIKELY':
        counter.UNLIKELY++;
        break;
      case 'VERY_UNLIKELY':
        counter.VERY_UNLIKELY++;
        break;
      default:
        break;
    }
  })
  return counter
}

const surpriseCounter = (arr) => {
  let counter = {
    VERY_UNLIKELY: 0,
    UNLIKELY: 0,
    POSSIBLE: 0,
    LIKELY: 0,
    VERY_LIKELY: 0,
  }
  arr.forEach(el => {
    // Hitung joyLikelihod
    switch (el.surpriseLikelihood) {
      case 'VERY_LIKELY':
        counter.VERY_LIKELY++;
        break;
      case 'LIKELY':
        counter.LIKELY++;
        break;
      case 'POSSIBLE':
        counter.POSSIBLE++;
        break;
      case 'UNLIKELY':
        counter.UNLIKELY++;
        break;
      case 'VERY_UNLIKELY':
        counter.VERY_UNLIKELY++;
        break;
      default:
        break;
    }
  })
  return counter
}

module.exports = googleVision;
