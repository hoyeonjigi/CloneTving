package site.hoyeonjigi.clonetving.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ContentGenreEntity;
import site.hoyeonjigi.clonetving.domain.ContentGenreEntityPK;

@Repository
public interface ContentGenreRepository extends JpaRepository<ContentGenreEntity,ContentGenreEntityPK> {

    //장르 이름으로 콘텐츠_장르 아이디 조회
    @Query(value = "select cg.content.contentId from ContentGenreEntity cg where cg.genre.genreName = :GenreName")
    List<String> findContentGenre(@Param("GenreName")String genreName);
}
