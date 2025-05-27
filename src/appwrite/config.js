import { Client, Storage, Databases, Query, ID } from "appwrite";
import conf from "../conf/conf";
import { useSelector } from "react-redux";

export class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Document ID is the slug
        {
          title,
          content,
          featuredImage, // This is the file ID from Storage
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return false; // Or throw error for more specific handling
    }
  }

  // slug here is the document ID
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      // Prepare data for update, only including fields that are provided
      const dataToUpdate = {
        title,
        content,
        status,
      };
      if (featuredImage) {
        // Only add featuredImage if a new one is provided
        dataToUpdate.featuredImage = featuredImage;
      }

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // Document ID
        dataToUpdate
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return false; // Or throw error
    }
  }

  // slug here is the document ID
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Document ID
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // slug here is the document ID
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug // Document ID
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  async getMyPosts(id) {
   
    const queries = Query.equal("userId", String(id));
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.and([queries, Query.equal("status", "active")])]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  // file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(), // Generates a unique ID for the file
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      // throw error; // Consider throwing to handle more specifically
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      // AppwriteException: The requested file could not be found. (404)
      // This is common if the file was already deleted or never existed with that ID.
      // Returning false is okay, but the calling function should be aware.
      return false;
    }
  }

  getFilePreview(fileId) {
    // Ensure fileId is provided before making the call
    if (!fileId) {
      console.warn(
        "Appwrite service :: getFilePreview :: Error: fileId is undefined or null."
      );
      // Return a placeholder or handle this case as appropriate for your UI
      // For example, return a specific URL or an empty string.
      // Throwing an error here might be too disruptive if called in a loop for many cards.
      return null; // Or a placeholder image URL
    }
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error", error);
      return null; // Or a placeholder image URL
    }
  }
}

const service = new Service();
export default service;
