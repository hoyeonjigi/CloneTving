package site.hoyeonjigi.clonetving.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Date;
import java.util.Optional;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import site.hoyeonjigi.clonetving.domain.ContentEntity;
import site.hoyeonjigi.clonetving.domain.ContentGenreEntity;
import site.hoyeonjigi.clonetving.domain.GenreEntity;

@SpringBootTest
@Transactional
public class ContentsRepositoryTest {

    @Autowired
    ContentRepository contentsRepository;

    @Autowired 
    ContentGenreRepository contentGenreRepository;

    @Autowired
    GenreRepository genreRepository;

    //콘텐츠 데이터 삽입 메소드
    @Test
    @Rollback(false)
    void save(String contentconf, String id, String title, String date , int view, String overview, String img, Boolean rating , String[] genreId){
        //given
        Date insertdate = Date.valueOf(date);
        ContentEntity contentsEntity = ContentEntity.builder()
                                            .contentClassification(contentconf)
                                            .contentId(id)
                                            .contentTitle(title)
                                            .contentReleaseDate(insertdate)
                                            .contentView(0)
                                            .contentOverview(overview)
                                            .contentImage(img)
                                            .contentRating(rating).build();

        //when
        ContentEntity saveContentsEntity = contentsRepository.save(contentsEntity);

        for(int i=0; i<genreId.length; i++){
            Optional<GenreEntity> genreEntity = genreRepository.findById(genreId[i]);
            ContentGenreEntity contentsGenreEntity = ContentGenreEntity.builder()
                                                            .content(contentsEntity)
                                                            .genre(genreEntity.orElse(null)).build();

            contentGenreRepository.save(contentsGenreEntity);
        }
        //then
        assertEquals(contentsEntity, saveContentsEntity);
    }

    //TMDB의 영화 데이터 파싱후 저장
    @Test
    @Rollback(false)
    void contentMoviesave() throws IOException, InterruptedException{
        for(int j=2;j<16; j++){
            HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko&page="+j+"&sort_by=popularity.desc"))
            .header("accept", "application/json")
            .header("Authorization", "")
            .method("GET", HttpRequest.BodyPublishers.noBody())
            .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body();
            JSONObject jObject = new JSONObject(jsonString);
            JSONArray jArray = jObject.getJSONArray("results");
            
            for(int i=0; i<jArray.length(); i++){
                JSONObject job = jArray.getJSONObject(i);
                String title = job.getString("title");
                String releaseDate = job.getString("release_date");
                String overview = job.getString("overview");
                String image = job.getString("poster_path");
                int id = job.getInt("id");
                String contentid = Integer.toString(id);
                boolean adult = job.getBoolean("adult");
                JSONArray genreIdsArray = job.getJSONArray("genre_ids");
                String[] genreArray = getStringArray(genreIdsArray);
                save("영화", contentid, title, releaseDate, 0, overview, image, adult,genreArray);
            }
        }
    }

    //TMDB의 TV콘텐츠 파싱후 저장
    @Test
    @Rollback(false)
    public void contentTvSave() throws IOException, InterruptedException {
        for(int j=11; j<12; j++){
            HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.themoviedb.org/3/discover/tv?include_adult=true&include_null_first_air_dates=false&language=ko&page="+j+"&sort_by=popularity.desc"))
            .header("accept", "application/json")
            .header("Authorization", "")
            .method("GET", HttpRequest.BodyPublishers.noBody())
            .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            String jString = response.body();
            JSONObject jsonObject = new JSONObject(jString);
            JSONArray jArray = jsonObject.getJSONArray("results");

            for(int i=0; i<jArray.length(); i++){
                JSONObject job = jArray.getJSONObject(i);
                String title = job.getString("name");
                String overview = job.getString("overview");
                String image = job.getString("poster_path");
                String releaseDate = job.getString("first_air_date");
                int id = job.getInt("id");
                String contentid = Integer.toString(id);
                JSONArray genreIdsArray = job.getJSONArray("genre_ids");
                String[] genreArray = getStringArray(genreIdsArray);
                save("드라마",contentid,title,releaseDate,0,overview,image,false,genreArray);
            }
        }
    }

    //JsonArray를 StringArray로 변환
    public String[] getStringArray(JSONArray jsonArray) {
        String[] stringArray = null;
        if (jsonArray != null) {
            int length = jsonArray.length();
            stringArray = new String[length];
            for (int i = 0; i < length; i++) {
                stringArray[i] = jsonArray.optString(i);
            }
        }
        return stringArray;
    }
}