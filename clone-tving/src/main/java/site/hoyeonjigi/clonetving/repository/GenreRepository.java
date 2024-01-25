package site.hoyeonjigi.clonetving.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import site.hoyeonjigi.clonetving.domain.GenreEntity;

@Repository
public interface GenreRepository extends JpaRepository<GenreEntity, String>{
    @Query(value = "select g.genreName from GenreEntity g")
    List<String> findGenreName();
}
