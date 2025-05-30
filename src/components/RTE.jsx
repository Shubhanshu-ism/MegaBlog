import React from "react";
import conf  from "../conf/conf"
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import appwriteService from "../appwrite/config"
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full shadow-xl focus:shadow-lg shadow-gray-600  rounded-2xl">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey={conf.tinyMceKey}
            init={{
              selector: "textarea",
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "codesample",
                "advlist",
                "autolink",
                "lists",
                "link",

                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",

                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "codesample",
                "help",
                "wordcount",
              ],
              codesample_languages: [
                { text: "HTML/XML", value: "markup" },
                { text: "JavaScript", value: "javascript" },
                { text: "CSS", value: "css" },
                { text: "PHP", value: "php" },
                { text: "Ruby", value: "ruby" },
                { text: "Python", value: "python" },
                { text: "Java", value: "java" },
                { text: "C", value: "c" },
                { text: "C#", value: "csharp" },
                { text: "C++", value: "cpp" },
              ],
              toolbar:
                " codesample  | undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help ",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              images_upload_handler: async (blobInfo, progress) => {
                try {
                  const file = blobInfo.blob();
                  // Ensure a unique filename if necessary, or use blobInfo.filename()
                  // For example: const uniqueFile = new File([file], `${Date.now()}-${blobInfo.filename()}`, { type: file.type });

                  const uploadedFile = await appwriteService.uploadFile(file);

                  if (uploadedFile && uploadedFile.$id) {
                    const imageUrl = appwriteService.getFilePreview(
                      uploadedFile.$id
                    ).href; // .href to get the string URL
                    return Promise.resolve(imageUrl);
                  } else {
                    console.error(
                      "Upload failed: No file ID returned from Appwrite."
                    );
                    return Promise.reject({
                      message: "Image upload failed: Could not get file ID.",
                      remove: true, // Remove the placeholder image
                    });
                  }
                } catch (error) {
                  console.error("Appwrite upload error:", error);
                  return Promise.reject({
                    message: `Image upload to Appwrite failed: ${
                      error.message || error
                    }`,
                    remove: true, // Remove the placeholder image
                  });
                }
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
