package site.hoyeonjigi.clonetving.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.hoyeonjigi.clonetving.domain.GenreEntity;

@Repository
public interface GenreRepository extends JpaRepository<GenreEntity, String>{
    
}
