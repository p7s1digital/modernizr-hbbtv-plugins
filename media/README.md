The test video was generated with the following command:

```shell
ffmpeg -f lavfi \
-i color=color=black:rate=25:size=352x288 \
-ar 32000 -ac 1 -f s16le -i /dev/zero \
-t 180 \
-codec:v libx264 -profile:v main -preset veryslow -r:v 25 -aspect 16:9 -g 50 -x264opts pic-struct:no-scenecut:keyint=50:keyint_min=50:colorprim=bt709:transfer=bt709:colormatrix=bt709:open_gop=0 -pix_fmt yuv420p \
-codec:a libfdk_aac -profile:a aac_low -b:a 8k \
-async 1 \
-map_chapters -1 -metadata:s language=deu \
-movflags faststart -y \
black_352x288_25fps_180s_aac_low.mp4
```