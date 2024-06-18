import axios from 'axios'


const getAllShows = async () => {
    const { data} = await axios.get('https://shlaiman.online/show/api/shows')

    const shows = data.shows
    if (data.shows) {
        const myShows = {
            Raven: {
                first: shows.Raven["2024-06-27"].reverse(),
                second: shows.Raven["2024-06-28"].reverse(),
                third: shows.Raven["2024-06-29"].reverse(),
                fourth: shows.Raven["2024-06-30"].reverse()
            },
            Buzzard: {
                first: shows.Buzzard["2024-06-27"].reverse(),
                second: shows.Buzzard["2024-06-28"].reverse(),
                third: shows.Buzzard["2024-06-29"].reverse(),
                fourth: shows.Buzzard["2024-06-30"].reverse()
            }, Eagle: {
                first: shows.Eagle["2024-06-27"].reverse(),
                second: shows.Eagle["2024-06-28"].reverse(),
                third: shows.Eagle["2024-06-29"].reverse(),
                fourth: shows.Eagle["2024-06-30"].reverse()
            }, Hawk: {
                first: shows.Hawk["2024-06-27"].reverse(),
                second: shows.Hawk["2024-06-28"].reverse(),
                third: shows.Hawk["2024-06-29"].reverse(),
                fourth: shows.Hawk["2024-06-30"].reverse()
            
            }, Vulture: {
                first: shows.Vulture["2024-06-27"].reverse(),
                second: shows.Vulture["2024-06-28"].reverse(),
                third: shows.Vulture["2024-06-29"].reverse(),
                fourth: shows.Vulture["2024-06-30"].reverse()
            },
        }

        return myShows
       
    } else return





}

export { getAllShows }