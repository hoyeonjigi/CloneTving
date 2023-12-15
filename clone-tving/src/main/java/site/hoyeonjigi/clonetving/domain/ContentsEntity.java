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
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "contents")
@Data
@AllArgsConstructor
public class ContentsEntity {
    
    @Id
    private String contentId;

    @Column(length=20, nullable=false)
    private String contentClassification;

    @Column(length=50, nullable=false)
    private String contentTitle;

    @Column(nullable=false)
    private String contentReleaseDate;

    @Column(nullable=false)
    private int contentView;

    @Column(length=255, nullable = true)
    private String contentOverview;

    @Column(nullable=false)
    private byte[] contentImg;

    @Column(nullable=false)
    private boolean contentRating;

    @OneToMany(mappedBy = "contentsentity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ContentsJenreEntity> jenres = new ArrayList<ContentsJenreEntity>();

    @OneToMany(mappedBy = "contentsentity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<EvaluationEntity> evaluations = new ArrayList<EvaluationEntity>();
}
