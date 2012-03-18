bb: bb-harness.o bb-sync.o bb-cs.o consumer.o producer.o utility.o
	gcc -o bb *.o -lpthread

bb-harness.o: bb-sync.h

bb-cs.o: bb-cs.h buffer.h

bb-sync.o: bb-sync.h buffer.h

consumer.o: bb-cs.h bb-sync.h buffer.h utility.h

producer.o: bb-cs.h bb-sync.h buffer.h utility.h

utility.o: utility.h

clean:
	rm bb *.o
