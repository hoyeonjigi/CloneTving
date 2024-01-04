package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ContentGenreRepositoryTest {
    
    @Autowired
    ContentGenreRepository contentGenreRepository;

    @Test
    void findcontentgenre(){
        List<String> contentgenreId = contentGenreRepository.findContentGenre("스릴러");
        assertEquals("1001835", contentgenreId.get(0));
    }
}
