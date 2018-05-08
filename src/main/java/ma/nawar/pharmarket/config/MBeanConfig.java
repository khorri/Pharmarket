package ma.nawar.pharmarket.config;


import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.jmx.export.MBeanExporter;
import org.springframework.context.annotation.Configuration;

/**
 * Created by HORRI on 08/05/2018.
 */
@Configuration
public class MBeanConfig {

    @Bean
    public MBeanExporter exporter(final @Qualifier("endpointMBeanExporter") MBeanExporter mBeanExporter) {
        mBeanExporter.setExcludedBeans("dataSource");
        return mBeanExporter;
    }
}
