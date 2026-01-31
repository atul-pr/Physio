import { motion } from "framer-motion";
import Hero from "../components/Hero";
import { exercises } from "../data/exercises";

export default function Exercises() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero
        title="Exercise Library"
        subtitle="Educational exercises you can do at home. Always consult your physiotherapist before starting new exercises."
        showCta={false}
      />

      <section className="section" style={{ padding: "5rem 1.5rem" }}>
        <div className="container">
          <div className="exercises-grid">
            {exercises.map((exercise, i) => (
              <motion.article
                key={exercise.id}
                className="exercise-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="exercise-category">{exercise.category}</span>
                <h3 className="exercise-title">{exercise.title}</h3>
                <p className="exercise-desc">{exercise.description}</p>
                <div className="exercise-steps">
                  <h4>Steps</h4>
                  <ol>
                    {exercise.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
                <p className="exercise-benefits">
                  <strong>Benefits:</strong> {exercise.benefits}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
