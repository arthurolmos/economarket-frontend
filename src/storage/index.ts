import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function get(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : null;
}

async function exists(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result ? true : false;
}

async function del(key: string) {
  await SecureStore.deleteItemAsync(key);
}

const storage = {
  save,
  get,
  exists,
  del,
};

export default storage;
