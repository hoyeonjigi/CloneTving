package site.hoyeonjigi.clonetving.domain;



import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "evaluation")
@Data
@AllArgsConstructor
@IdClass(EvaluationEntityPK.class)
public class EvaluationEntity {

    @Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "user_id"),
        @JoinColumn(name = "profile_name")
    })
    private ProfileEntity profile;

    @Id
    @ManyToOne
    @JoinColumn(name = "content_id")
    private ContentsEntity content;

    @Column(nullable=false)
    private float starRating;

    @Column(length =20 , nullable=false)
    private String review;

    @Column(nullable=false)
    private Date ratingDate;

}