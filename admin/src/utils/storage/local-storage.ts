/**
 * Copyright 2020 Design Barn Inc.
 */

import { localStore } from '../../helpers/consts';

import { AbstractStorage } from './abstract-storage';

/**
 * Storage provider managing key-values in global local storage store.
 */
export class LocalStorage extends AbstractStorage {
  /**
   * Returns whether the storage method is supported in the current environment.
   */
  public static get isSupported(): boolean {
    try {
      const randomKey = Math.random().toString();
      const testKey = `localstorage-test${randomKey}`;

      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Returns the number of items in storage.
   */
  public get length(): number {
    return sessionStorage.length || 0;
  }

  /**
   * Clears all items in storage.
   */
  public async clear(): Promise<void> {
    const restored = sessionStorage.getItem(localStore.firstExperienced);

    sessionStorage.clear();
    sessionStorage.setItem(localStore.firstExperienced, restored as any);
  }

  /**
   * Destroys storage.
   */
  public async destroy(): Promise<void> {
    this.clear();
  }

  /**
   * Returns the items matching the given key pattern.
   */
  public async findItem(keyPattern: RegExp): Promise<any[]> {
    const results:any = [];

    for (let i = 0; i < this.length; i++) {
      const key = sessionStorage.key(i);

      if (key && keyPattern.test(key)) {
        const value = this.getItem(key);

        results.push({ key, value });
      }
    }

    return results;
  }

  /**
   * Returns the given item by key.
   */
  public async getItem(key: string): Promise<any> {
    try {
      const value = sessionStorage.getItem(key);

      return JSON.parse(`${value}`);
    } catch (error) {
      throw new Error(`Error while trying to save ${key}`);
    }
  }

  /**
   * Checks whether the given key is in storage.
   */
  public async hasItem(key: string): Promise<boolean> {
    const item = sessionStorage.getItem(key);

    return Boolean(item);
  }

  /**
   * Initialize by loading any persisted data into the storage.
   */
  public async load(defaults: Record<string, string>): Promise<void> {
    // Initialize with the given defaults
    for (const key of Object.keys(defaults)) {
      if (!(await this.hasItem(key))) {
        await this.setItem(key, defaults[key]);
      }
    }
  }

  /**
   * Removes the given item.
   */
  public async removeItem(key: string): Promise<void> {
    sessionStorage.removeItem(key);
  }

  /**
   * Stores the given key-value item.
   */
  public async setItem(key: string, value: any): Promise<void> {
    const json = JSON.stringify(value);

    sessionStorage.setItem(key, json);
  }
}
