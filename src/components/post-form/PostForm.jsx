import React, { useCallback, useEffect, useState } from "react"; // Added useState
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from ".."; // Assuming index.js is in the parent 'components' folder
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "", // slug is the document ID
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [formError, setFormError] = useState(""); // For displaying errors on the form

  const submit = async (data) => {
    setFormError(""); // Clear previous errors
    try {
      if (post) {
        // UPDATING AN EXISTING POST (post object exists)
        let newFileId = null;
        if (data.image && data.image[0]) {
          // If a new image is selected
          const uploadedFile = await appwriteService.uploadFile(data.image[0]);
          if (uploadedFile) {
            newFileId = uploadedFile.$id;
          } else {
            setFormError(
              "Failed to upload new image. Please try again/Disable extention/Clear your browser's cache before Update"
            );
            return; // Stop submission if new image upload fails
          }
        }

        const updateData = {
          title: data.title,
          content: data.content,
          status: data.status,
        };

        if (newFileId) {
          updateData.featuredImage = newFileId;
        }
        // If newFileId is null, featuredImage is not sent, so Appwrite won't update it, keeping the old one.

        const dbPost = await appwriteService.updatePost(post.$id, updateData); // post.$id is the document ID (slug)

        if (dbPost && dbPost.$id) {
          // If a new image was uploaded and the old one existed, delete the old one
          if (newFileId && post.featuredImage) {
            await appwriteService
              .deleteFile(post.featuredImage)
              .catch((err) =>
                console.warn(
                  "PostForm: Could not delete old file during update:",
                  err.message
                )
              );
          }
          navigate(`/post/${dbPost.$id}`);
        } else {
          setFormError(
            "Failed to update post. Please try again/Disable extention/Clear your browser's cache before Update"
          );
          // If update failed but a new file was uploaded, it might be orphaned.
          // Consider deleting newFileId if dbPost update fails.
          if (newFileId) {
            await appwriteService
              .deleteFile(newFileId)
              .catch((err) =>
                console.warn(
                  "PostForm: Could not cleanup orphaned new file after update failure:",
                  err.message
                )
              );
          }
        }
      } else {
        // CREATING A NEW POST
        if (!data.image || !data.image[0]) {
          setFormError("Please select a featured image for the new post.");
          return;
        }

        const uploadedFile = await appwriteService.uploadFile(data.image[0]);

        if (uploadedFile) {
          const fileId = uploadedFile.$id;
          const dbPost = await appwriteService.createPost({
            ...data, // title, slug (from form), content, status
            featuredImage: fileId,
            userId: userData.$id,
          });

          if (dbPost && dbPost.$id) {
            navigate(`/post/${dbPost.$id}`);
          } else {
            setFormError("Failed to create post. Please try again.");
            // If post creation failed, delete the orphaned uploaded file
            await appwriteService
              .deleteFile(fileId)
              .catch((err) =>
                console.warn(
                  "PostForm: Could not cleanup orphaned file after create failure:",
                  err.message
                )
              );
          }
        } else {
          setFormError("Failed to upload featured image. Post not created.");
        }
      }
    } catch (error) {
      console.error("Error submitting post form:", error);
      setFormError(`An unexpected error occurred: ${error.message}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace non-alphanumeric (excluding space) with dash
        .replace(/\s+/g, "-"); // Replace one or more spaces with a single dash
    return "";
  }, []);

  useEffect(() => {
    // Only auto-generate slug from title if we are CREATING a new post
    if (!post) {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue, post]); // 'post' ensures this effect re-evaluates if 'post' prop changes

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap ">
      <div className="w-full md:w-2/3 px-2 ">
        {formError && (
          <p className="text-red-600 mt-2 mb-4 text-center ">{formError}</p>
        )}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 shadow-lg shadow-gray-600 rounded-xl focus:shadow-md"
          {...register("title", { required: "Title is required" })}
        />
        <Input
          label="Slug (URL Identifier) :"
          placeholder="Slug will be auto-generated from title for new posts"
          className="mb-4 shadow-lg shadow-gray-600 rounded-xl focus:shadow-md"
          {...register("slug", { required: "Slug is required" })}
          readOnly={!!post} // Slug is the document ID, cannot be changed for existing posts
          onInput={(e) => {
            // Allow manual slug input only if creating a new post
            if (!post) {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          
        />
      </div>
      <div className="w-full md:w-1/3 px-2 mt-4 md:mt-0 ">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 shadow-lg shadow-gray-600 rounded-xl focus:shadow-md"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post
              ? "Featured image is required for new posts"
              : false,
          })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4 ">
            <p className="text-sm mb-1">Current Image:</p>
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className=" max-h-40 object-contain shadow-gray-600 rounded-xl focus:shadow-md"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 shadow-lg shadow-gray-600 rounded-xl focus:shadow-md"
          {...register("status", { required: "Status is required" })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-600"} // Adjusted colors
          className="w-full hover:bg-green-600 active:bg-green-700 shadow-lg shadow-gray-600 rounded-xl hover:shadow-md duration-200" // Example hover/active
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
