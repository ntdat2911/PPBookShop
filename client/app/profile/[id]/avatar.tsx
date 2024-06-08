"use client";
import { format } from "date-fns";

import { Avatar, AvatarProps } from "@files-ui/react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { ResetIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { UserDto } from "@/services/auth/dto";
import { useSession } from "next-auth/react";
import { updateImage } from "@/services/users/service";
const fallBackImage =
  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const getAvatarFilename = (avatarURL: string) => {
  const fileName = avatarURL?.split("/").pop();
  return fileName !== undefined ? fileName : "";
};

interface ProfileSectionProps {
  user: UserDto | undefined;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [imageSource, setImageSource] = React.useState<AvatarProps["src"]>(
    user?.image ? user.image : fallBackImage
  );
  const [isUpdatingAvatar, setIsUpdatingAvatar] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    setImageSource(user?.image);
  }, [user]);
  const handleChangeSource = (selectedFile: File) => {
    setImageSource(selectedFile);
    setIsUpdatingAvatar(true);
  };

  const { toast } = useToast();

  const onUpdateAvatar = async () => {
    try {
      if (imageSource !== fallBackImage && user?.image !== undefined) {
        const formData = new FormData();

        formData.append("file", imageSource as File);

        formData.append("upload_preset", "fxwqzera");
        const data = await fetch(
          "https://api.cloudinary.com/v1_1/dmbwhnml9/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((r) => r.json());
        if (user.id) {
          await updateImage(user.id, data.secure_url, user.accessToken);
          window.location.reload();
        }
        setIsUpdatingAvatar(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Update user information failed",
        variant: "destructive",
      });
    }
  };

  const onResetAvatar = () => {
    setIsUpdatingAvatar(false);
    setImageSource(user?.image ? user.image : fallBackImage);
  };

  return (
    <div className="flex flex-col items-center">
      <Avatar
        src={imageSource}
        onError={() => setImageSource(fallBackImage)}
        variant="circle"
        style={{ width: "200px", height: "200px" }}
        onChange={(imageSrc) => handleChangeSource(imageSrc)}
        changeLabel={"Change this image..."}
        alt="Avatar"
      />
      {isUpdatingAvatar && (
        <div>
          <Button
            className="my-3 mx-1"
            variant="ghost"
            onClick={onUpdateAvatar}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button className="my-3 mx-1" variant="ghost" onClick={onResetAvatar}>
            <ResetIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
