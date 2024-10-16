import { User } from "..";

/**
 * Interface representing a repository for managing user data.
 */
export interface UserRepository {

  /**
   * Saves a regular user to the repository.
   * @param user - The user to be saved.
   * @returns A promise that resolves when the user is saved.
   */
  save(user: User): Promise<void>;

  /**
   * Finds a regular user by their email.
   * @param email - The email of the user to find.
   * @returns A promise that resolves with the user if found, or null if not found.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
  * Finds a google user by their googleId.
  * @param googleId - The googleId of the user to find.
  * @returns A promise that resolves with the user if found, or null if not found.
  */
  findByGoogleId(googleId: string): Promise<User | null>;
}
