/**
 * Copyright 2020 Design Barn Inc.
 */

/**
 * Base class for a Storage Adapter
 */
export abstract class AbstractStorage {
  /**
   * Returns whether the storage method is supported in the current environment.
   */
  public static isSupported: boolean;

  /**
   * Returns the number of items in storage.
   */
  public abstract get length(): number;

  /**
   * Clears all items in storage.
   */
  public abstract clear(): Promise<void>;

  /**
   * Destroys and cleans the access to the storage.
   */
  public abstract destroy(): Promise<void>;

  /**
   * Returns the items matching the given key pattern.
   */
  public abstract findItem(keyPattern: RegExp): Promise<any[]>;

  /**
   * Returns the given item by key.
   */
  public abstract getItem(key: string): Promise<any>;

  /**
   * Checks whether the given key is in storage.
   */
  public abstract hasItem(key: string): Promise<boolean>;

  /**
   * Initialize by loading any persisted data into the storage.
   */
  public abstract load(initialData?: Record<string, string>): Promise<void>;

  /**
   * Removes the given item.
   */
  public abstract removeItem(key: string): Promise<void>;

  /**
   * Stores the given key-value item.
   */
  public abstract setItem(key: string, value: any): Promise<void>;
}
