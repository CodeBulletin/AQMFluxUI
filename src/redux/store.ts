import { configureStore } from "@reduxjs/toolkit";
import ConfigAPI from "./apis/config";
import OpenWeatherAPI from "./apis/openweather";
import AttributeAPI from "./apis/attribute";
import LocationAPI from "./apis/location";
import SensorAPI from "./apis/sensor";
import DeviceAPI from "./apis/device";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
  reducer: {
    [ConfigAPI.reducerPath]: ConfigAPI.reducer,
    [OpenWeatherAPI.reducerPath]: OpenWeatherAPI.reducer,
    [AttributeAPI.reducerPath]: AttributeAPI.reducer,
    [LocationAPI.reducerPath]: LocationAPI.reducer,
    [SensorAPI.reducerPath]: SensorAPI.reducer,
    [DeviceAPI.reducerPath]: DeviceAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ConfigAPI.middleware)
      .concat(OpenWeatherAPI.middleware)
      .concat(AttributeAPI.middleware)
      .concat(LocationAPI.middleware)
      .concat(SensorAPI.middleware)
      .concat(DeviceAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
