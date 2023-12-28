package site.hoyeonjigi.clonetving.domain;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import java.sql.Date;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "content")
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ContentEntity {
    
    @Id
    private String contentId;

    @Column(length=20, nullable=false)
    private String contentClassification;

    @Column(length=50, nullable=false)
    private String contentTitle;

    @Column(nullable=false)
    private Date contentReleaseDate;

    @Column(nullable=false)
    private int contentView;

    @Column(length=255, nullable = true)
    private String contentOverview;

    @Column(nullable=false)
    private String contentImage;

    @Column(nullable=false)
    private boolean contentRating;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ContentGenreEntity> genres = new ArrayList<ContentGenreEntity>();

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EvaluationEntity> evaluations = new ArrayList<EvaluationEntity>();

    public Object stream() {
        return null;
    }
}
