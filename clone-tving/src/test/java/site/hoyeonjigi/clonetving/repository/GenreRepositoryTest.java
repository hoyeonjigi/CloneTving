package site.hoyeonjigi.clonetving.repository;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import site.hoyeonjigi.clonetving.domain.GenreEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@SpringBootTest
@Transactional
public class GenreRepositoryTest {

    @Autowired
    GenreRepository genreRepository;

    void save(String genreId, String genreName){
        GenreEntity genreEntity = GenreEntity.builder()
                                    .genreId(genreId)
                                    .genreName(genreName).build();
        GenreEntity saveGenreEntity = genreRepository.save(genreEntity);
        assertEquals(genreEntity, saveGenreEntity);
    }

    @Test
    @Rollback(false)
    void insertJenre() throws IOException, InterruptedException{
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://api.themoviedb.org/3/genre/tv/list?language=ko"))
        .header("accept", "application/json")
        .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWQxMDM3Y2MwYzZiZTk4ODVhZTRiMTQxMTVjN2U0MCIsInN1YiI6IjY1NWIxOTdhZjY3ODdhMDEwMDhiZGMxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dmjFpapNQf7gjcTImbzG1GwaF3lvgJtKENrzuddC1as")
        .method("GET", HttpRequest.BodyPublishers.noBody())
        .build();
    HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
    String jsonString = response.body();
    JSONObject jsonObject = new JSONObject(jsonString);
    JSONArray genreArray = jsonObject.getJSONArray("genres");
    for(int i=0; i<genreArray.length(); i++){
        JSONObject job = genreArray.getJSONObject(i);
        String genreName = job.getString("name");
        String genreId = Integer.toString(job.getInt("id"));
        System.out.println("name = " + genreName);
        System.out.println("id = "+ genreId);
        save(genreId, genreName);
    }   
    }
}
