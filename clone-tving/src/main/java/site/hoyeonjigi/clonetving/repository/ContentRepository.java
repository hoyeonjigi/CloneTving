package site.hoyeonjigi.clonetving.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.ContentEntity;


@Repository
public interface ContentRepository extends JpaRepository<ContentEntity, String>{
    List<ContentEntity> findFirst20ByContentClassificationOrderByContentReleaseDateDesc(String classification);



    // @Query(value="select c from ContentEntity c " +
    //             "where c.contentId IN " +
    //             "(select distinct cg.content.contentId from ContentGenreEntity cg "+
    //             "where cg.genre.genreId IN "+
    //             "(select g.genreId from GenreEntity g where g.genreName = :genreName))")

    @Query(value="select c " +
                "from ContentEntity c " +
                "where c.contentClassification = :ContentClassification AND c.contentId IN "+
                    "(select distinct cg.content.contentId "+
                    "from ContentGenreEntity cg " +
                    "where cg.genre.genreName = :genreName)")
    List<ContentEntity> findContentByGenre(@Param("ContentClassification")String classification,
                @Param("genreName")String genreName,Pageable pageable);
}
