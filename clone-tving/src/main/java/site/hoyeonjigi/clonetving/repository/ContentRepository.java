package site.hoyeonjigi.clonetving.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.hoyeonjigi.clonetving.domain.ContentEntity;


@Repository
public interface ContentRepository extends JpaRepository<ContentEntity, String>{
    //최신 콘텐츠 20개 검색
    List<ContentEntity> findFirst20ByContentClassificationOrderByContentReleaseDateDesc(String classification);

    //장르별 콘텐츠 
    @Query(value="select c " +
                "from ContentEntity c " +
                "where c.contentClassification = :ContentClassification AND c.contentId IN "+
                    "(select distinct cg.content.contentId "+
                    "from ContentGenreEntity cg " +
                    "where cg.genre.genreName = :genreName)")
    List<ContentEntity> findContentByGenre(@Param("ContentClassification")String classification,
                @Param("genreName")String genreName,Pageable pageable);
    
    //인기있는 콘텐츠
    @Query(value="select c "+
                "from ContentEntity c " +
                "join c.evaluations e " +
                "where c.contentClassification = :ContentClassification AND c.contentView > 1000 " +
                "group by c.contentId " +
                "having count(e) > 0 " +
                "order by avg(e.starRating) desc")
    List<ContentEntity> findPopularContent(@Param("ContentClassification")String classification,Pageable pageable);
    List<ContentEntity> findByContentTitleContaining(String contentTitle,Pageable pageable);

    //해당 콘텐츠 조회수 증가
    @Modifying
    @Query(value = "update ContentEntity c set c.contentView = c.contentView + 1 WHERE c.contentId = :contentId")
    void updateView(String contentId);
}
