from livepeer_ai import Livepeer
from dotenv import load_dotenv
import os

load_dotenv()

livepeer_api_key= os.getenv("LIVEPEER_API_KEY")

text2img_model_list = [
    'SG161222/RealVisXL_V4.0_Lightning',
    'ByteDance/SDXL-Lightning',
    'SG161222/Realistic_Vision_V6.0_B1_noVAE',
    'stabilityai/stable-diffusion-xl-base-1.0',
    'runwayml/stable-diffusion-v1-5',
    'prompthero/openjourney-v4',
    'SG161222/RealVisXL_V4.0',
    'stabilityai/sd-turbo',
    'stabilityai/sdxl-turbo',
    'stabilityai/stable-diffusion-3-medium-diffusers'
]

img2video_model_list = [
    'stable-video-diffusion-img2vid-xt',
    'stabilityai/stable-video-diffusion-img2vid-xt-1-1',   
]
        

def text_to_image(prompt: str, model_id: str = text2img_model_list[1] ):
    """
    This function generates an image from a text prompt using the Livepeer AI API.

    Args:
        prompt (str): The text prompt to generate an image from.
        model_id (str): The ID of the model to use for image generation. Defaults to 'ByteDance/SDXL-Lightning'.
        
    Returns:
        str: The path to the generated image file.
    """
    s = Livepeer(http_bearer=livepeer_api_key)

    res = s.generate.text_to_image(request={
        "prompt": prompt,
        "model_id": model_id,
        "width": 1080,
        "height": 1920
    })
    print(res)
    if res.image_response is not None and res.image_response.images:
        image_url = res.image_response.images[0].url
        return image_url
    else:
        return None


def image_to_video(image_path: str, model_id: str = img2video_model_list[1]):
    """
    This function generates a video from an image using the Livepeer AI API.

    Args:
        image_path (str): The path to the image file to generate a video from.
        model_id (str): The ID of the model to use for video generation. Defaults to 'stabilityai/stable-video-diffusion-img2vid-xt-1-1'.

    Returns:
        str: The path to the generated video file.
    """
    s = Livepeer(http_bearer=livepeer_api_key)

    res = s.generate.image_to_video(request={
        "image": {
            "file_name": image_path,
            "content": open(image_path, "rb"),
            "height": 1920,
            "width": 1080,
            "fps": 60
            
        },
        "model_id" : model_id,
    })

    if res.video_response is not None and res.video_response.images:
        video_url = res.video_response.images[0].url
        return video_url

    else:
        return None
