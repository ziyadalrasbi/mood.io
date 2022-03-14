export const filterFeaturesByMaxEmotion = (emotion) => {
    const maxEmotion = emotion;

    const valence = maxEmotion == 'happy' ? 0.9 :
        (maxEmotion == 'sad' ? 0.3 :
            (maxEmotion == 'angry' ? 0.4 :
                (maxEmotion == 'neutral' ? 0.7 :
                    (maxEmotion == 'surprised' ? 0.7 :
                        (maxEmotion == 'confused' && 0.6)))));

    const energy = maxEmotion == 'happy' ? 0.7 :
        (maxEmotion == 'sad' ? 0.07 :
            (maxEmotion == 'angry' ? 0.1 :
                (maxEmotion == 'neutral' ? 0.4 :
                    (maxEmotion == 'surprised' ? 0.1 :
                        (maxEmotion == 'confused' && 0.3)))));

    // const danceability = maxEmotion == 'happy' ? 0.7 :
    //     (maxEmotion == 'sad' ? 0.3 :
    //         (maxEmotion == 'angry' ? 0.2 :
    //             (maxEmotion == 'neutral' ? 0.3 :
    //                 (maxEmotion == 'surprised' ? 0.5 :
    //                     (maxEmotion == 'confused' && 0.3)))));

    // const loudness = maxEmotion == 'happy' ? -5 :
    //     (maxEmotion == 'sad' ? -15 :
    //         (maxEmotion == 'angry' ? -15 :
    //             (maxEmotion == 'neutral' ? -10 :
    //                 (maxEmotion == 'surprised' ? -10 :
    //                     (maxEmotion == 'confused' && -10)))));

    // const key = maxEmotion == 'happy' ? 9 :
    //     (maxEmotion == 'sad' ? 4 :
    //         (maxEmotion == 'angry' ? 5 :
    //             (maxEmotion == 'neutral' ? 7 :
    //                 (maxEmotion == 'surprised' ? 6 :
    //                     (maxEmotion == 'confused' && 6)))));

    // const tempo = maxEmotion == 'happy' ? 125 :
    //     (maxEmotion == 'sad' ? 75 :
    //         (maxEmotion == 'angry' ? 90 :
    //             (maxEmotion == 'neutral' ? 100 :
    //                 (maxEmotion == 'surprised' ? 100 :
    //                     (maxEmotion == 'confused' && 80)))));

    var arrayOfFeatures = [valence, energy];
    var objectOfFeatures = {
        // target_key: key,
        max_energy: energy,
        // target_tempo: tempo,
        max_valence: valence,
        // target_loudness: loudness
    }

    const features = {
        array: arrayOfFeatures,
        object: objectOfFeatures
    }

    return features;
}

export const getMood = (maxMood) => {
    if (maxMood) {
        if (maxMood == 'happy') {
            const mood = {
                moodHeader: 'that you are feeling happy!',
                moodDescription: 'Be sure to spread the happiness with others around you :)'
            }
            return mood;
        }
        if (maxMood == 'sad') {
            const mood = {
                moodHeader: 'that you are feeling down.',
                moodDescription: 'It will get better, keep your head up high!'
            }
            return mood;
        }
        if (maxMood == 'angry') {
            const mood = {
                moodHeader: 'that you seem tempered and full of energy!',
                moodDescription: 'Try to harness your energy into something positive!'
            }
            return mood;
        }
        if (maxMood == 'fearful') {
            const mood = {
                moodHeader: 'that you seem fearful. Stay safe!',
                moodDescription: 'Surround yourself around people that make you feel safe.'
            }
            return mood;
        }
        if (maxMood == 'disgusted') {
            const mood = {
                moodHeader: 'that something may be putting you off.',
                moodDescription: 'Engage in activities that put you in your comfort zone.'
            }
            return mood;
        }
        if (maxMood == 'surprised') {
            const mood = {
                moodHeader: 'that something may be surprising you!',
                moodDescription: 'We hope it is nothing to be concerned about!'
            }
            return mood;
        }
        if (maxMood == 'confused') {
            const mood = {
                moodHeader: 'that you may be confused about something.',
                moodDescription: 'Be patient, you\'ll figure it out!'
            }
            return mood;
        }
        if (maxMood == 'neutral') {
            const mood = {
                moodHeader: 'that everything seems normal!',
                moodDescription: 'Being in a neutral state of mind is always good!'
            }
            return mood;
        }
    }
}