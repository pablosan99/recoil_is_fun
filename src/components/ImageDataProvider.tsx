import { createApi } from 'unsplash-js';
import { atom, selector } from 'recoil';

export const unsplashApi = atom<ReturnType<typeof createApi>>({
  key: "unsplashApi",
  effects: [({setSelf}) => {
    const api = createApi({
      accessKey: "hk571WiiP1uX2KLalYNjj6S6yJAz96SoeRCWoscoxEk"
    })
    setSelf(api)
  }]
})

export const randomPhoto = selector({
  key: "random-photo",
  get: async ({get}) => {
    const api = get(unsplashApi);

    const response = await api.photos.getRandom(undefined);

    if (response.type != "error") {
      console.log("Response", response);
      return response.response;
    }
    return undefined;
  }
})


