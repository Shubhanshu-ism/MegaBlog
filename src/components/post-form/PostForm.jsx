import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        // UPDATING AN EXISTING POST
        let file = null;

        // Only upload new file if user selected one
        if (data.image && data.image[0]) {
          file = await appwriteService.uploadFile(data.image[0]);
        }

        // Prepare update data
        const updateData = {
          title: data.title,
          content: data.content,
          status: data.status,
          slug: data.slug,
        };

        // Only add featuredImage if we have a new file
        if (file) {
          updateData.featuredImage = file.$id;

          // Delete old file ONLY if it exists and we have a new file
          if (post.featuredImage && post.featuredImage !== file.$id) {
            try {
              await appwriteService.deleteFile(post.featuredImage);
            } catch (error) {
              console.warn("Could not delete old file:", error.message);
              // Don't fail the entire operation if old file deletion fails
            }
          }
        }

        const dbPost = await appwriteService.updatePost(post.$id, updateData);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // CREATING A NEW POST
        if (!data.image || !data.image[0]) {
          alert("Please select an image for the post");
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await appwriteService.createPost({
            title: data.title,
            content: data.content,
            status: data.status,
            slug: data.slug,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          readOnly={!!post} // Add this line
          onInput={(e) => {
            if(!post){
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
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
