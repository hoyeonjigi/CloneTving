package site.hoyeonjigi.clonetving.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import site.hoyeonjigi.clonetving.domain.EvaluationEntity;
import site.hoyeonjigi.clonetving.domain.EvaluationEntityPK;

public interface EvaluationRepository extends JpaRepository<EvaluationEntity, EvaluationEntityPK>{

}
