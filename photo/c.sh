for i in `ls *.jpg`
do
	jpeg-recompress --quality low $i a$i
done

for i in `ls *.JPG`
do
	jpeg-recompress --quality low $i a$i
done